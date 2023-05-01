const AddItem = (props) => {
    const { newItem, setNewItem, onAdd } = props;

    return (
        <>
            <div className="inputBox">
                <input
                    type="text"
                    value={newItem || ''}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="請輸入待辦事項事項"
                />

                <button role="link" onClick={onAdd}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
        </>
    );
};

export default AddItem;
