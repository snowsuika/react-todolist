const Footer = (props) => {
    const { todoItems,onRemoveFinishs } = props;

    return (
        <>
            <div className="todoList_statistics">
                <p> {todoItems.filter((item) => item.completed_at).length} 個已完成項目</p>
                <button onClick={onRemoveFinishs}>清除已完成項目</button>
            </div>
        </>
    );
};

export default Footer;
