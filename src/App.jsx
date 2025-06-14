import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import List from './components/List';
import CreateListButton from './components/CreateListButton';
import { fetchLists } from './services/listService';
import './App.css';
import ErrorScreen from './components/ErrorScreen';

const App = () => {
  const [lists, setLists] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');
  const [selectedLists, setSelectedLists] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newListCreated, setNewListCreated] = useState(false);
  const [newListMeta, setNewListMeta] = useState({
    newListId: null,
    leftListId: null,
    rightListId: null,
  });

  const [displayNames, setDisplayNames] = useState({});

  useEffect(() => {
    const loadLists = async () => {
      try {
        const data = await fetchLists();
        setLists(data);
        const orderedListIds = Object.keys(data).sort();
        setListOrder(orderedListIds);
        const initialDisplayNames = {};
        orderedListIds.forEach((id, index) => {
          initialDisplayNames[id] = index + 1;
        });
        setDisplayNames(initialDisplayNames);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadLists();
  }, []);

  const moveItem = (itemId, fromListId, toListId) => {
    const itemToMove = lists[fromListId].find((item) => item.id === itemId);
    if (!itemToMove) return;

    setLists((prev) => ({
      ...prev,
      [fromListId]: prev[fromListId].filter((item) => item.id !== itemId),
      [toListId]: [...(prev[toListId] || []), itemToMove],
    }));
  };

  const toggleListSelection = (listId) => {
    setSelectedLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  const createNewList = () => {
    if (selectedLists.length < 2) {
      setWarningMessage(
        'You should select exactly 2 lists to create a new list'
      );
      return;
    }

    const newId = `list-${Date.now()}`;
    const updatedLists = {
      ...lists,
      [newId]: [],
    };
    setLists(updatedLists);

    const [left, right] = selectedLists;
    const indexA = listOrder.indexOf(left);
    const indexB = listOrder.indexOf(right);
    const insertIndex = Math.min(indexA, indexB) + 1;

    const updatedOrder = [
      ...listOrder.slice(0, insertIndex),
      newId,
      ...listOrder.slice(insertIndex),
    ];
    const newDisplayNumber = Object.keys(displayNames).length + 1;

    setDisplayNames((prev) => ({
      ...prev,
      [newId]: newDisplayNumber,
    }));

    setListOrder(updatedOrder);
    setSelectedLists([]);
    setNewListCreated(true);
    setIsCreating(true);
    setWarningMessage('');
    setNewListMeta({ newListId: newId, leftListId: left, rightListId: right });
  };

  if (loading)
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: '100vh' }}
      >
        <div className="spinner mb-3"></div>
        <div className="fw-semibold fs-5 text-primary">
          Organizing your lists...
        </div>
      </div>
    );
  if (error) return <ErrorScreen onRetry={() => window.location.reload()} />;

  return (
    <div className="container mt-4">
      {warningMessage && (
        <div className="alert alert-danger text-center" role="alert">
          {warningMessage}
        </div>
      )}
      <Header />
      <div className="text-center mb-3">
        <CreateListButton onClick={createNewList} />
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
        {listOrder.map((listId, index) => (
          <div className="col" key={listId}>
            <List
              listId={listId}
              items={lists[listId]}
              lists={lists}
              displayNumber={displayNames[listId]}
              moveItem={moveItem}
              selectedLists={selectedLists}
              toggleListSelection={(id) => {
                setSelectedLists((prev) =>
                  prev.includes(id)
                    ? prev.filter((l) => l !== id)
                    : [...prev, id]
                );
              }}
              isCreating={isCreating}
              {...(isCreating ? newListMeta : {})}
            />
          </div>
        ))}
      </div>

      {newListCreated && (
        <div className="p-4 mb-3">
          <div className="d-flex justify-content-center gap-5">
            <button
              className="btn btn-outline-secondary mr-2"
              onClick={() => {
                const { newListId } = newListMeta;
                if (newListId) {
                  const { [newListId]: _, ...restLists } = lists;
                  setLists(restLists);
                  setListOrder(listOrder.filter((id) => id !== newListId));
                }
                setNewListCreated(false);
                setIsCreating(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setNewListCreated(false);
                setIsCreating(false);
              }}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
