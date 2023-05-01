const StatusFilter = (props) => {
    const { currentStatus, setCurrentStatus } = props;
    let statusList = [
        {
            name: '全部',
            status: 0,
            active: true,
        },
        {
            name: '待完成',
            status: 1,
            active: false,
        },
        {
            name: '已完成',
            status: 2,
            active: false,
        },
    ];

    const onFilter = (statusCode) => {
        // statusCode: 0 全部 ; 1 待完成 ; 2 已完成
        setCurrentStatus(statusCode);
    };

    return (
        <ul className="todoList_tab">
            {statusList.map((item) => {
                return (
                    <li data-status={item.status} key={item.status} onClick={(e) => onFilter(item.status)}>
                        <button className={`clear_btn_style ${item.status === currentStatus ? 'active' : ''}`}>
                        {item.name}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default StatusFilter;
