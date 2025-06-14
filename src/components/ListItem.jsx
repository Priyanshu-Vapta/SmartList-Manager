import '../App.css';

const ListItem = ({
  item,
  listId,
  moveItem,
  isCreating,
  leftListId,
  rightListId,
  newListId,
}) => {
  const showArrow = (from, to, direction) => (
    <button
      key={`${from}-${to}`}
      className="btn btn-sm btn-outline-secondary ms-1"
      onClick={() => moveItem(item.id, from, to)}
    >
      {direction}
    </button>
  );
  const getButtons = () => {
    if (!isCreating) return null;

    if (listId === leftListId) {
      return showArrow(listId, newListId, '→');
    }

    if (listId === rightListId) {
      return showArrow(listId, newListId, '←');
    }

    if (listId === newListId) {
      return (
        <>
          {showArrow(listId, leftListId, '←')}
          {showArrow(listId, rightListId, '→')}
        </>
      );
    }

    return null;
  };

  return (
    <div
      className="mb-3 p-4 border bg-white rounded-4"
      style={{ transition: '0.3s' }}
    >
      <div className="d-flex justify-content-between align-items-start ">
        <div>
          <div className="fw-semibold">{item.name}</div>
          <div className="text-muted small">{item.scientificName}</div>
        </div>
        <div>{getButtons()}</div>
      </div>
    </div>
  );
};

export default ListItem;
