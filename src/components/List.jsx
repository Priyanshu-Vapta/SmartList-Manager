import ListItem from './ListItem';
import '../App.css';

const List = ({
  listId,
  items = [],
  lists,
  moveItem,
  selectedLists = [],
  toggleListSelection = () => {},
  isCreating = false,
  newListId = '',
  leftListId = '',
  rightListId = '',
  displayNumber,
}) => {
  const isSelected = selectedLists.includes(listId);

  return (
    <div className="flex-grow-1 mt-3 scrollable-list h-100">
      <div className=" card-body d-flex flex-column list-bg rounded p-3 border-0 position-relative h-100">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-3">
            List {displayNumber} ({items.length})
          </h5>

          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleListSelection(listId)}
          />
        </div>
        <div className="flex-grow-1 overflow-auto mt-3">
          {items.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              listId={listId}
              lists={lists}
              moveItem={moveItem}
              isCreating={isCreating}
              leftListId={leftListId}
              rightListId={rightListId}
              newListId={newListId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
