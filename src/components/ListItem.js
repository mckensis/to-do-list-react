const ListItem = ({ list }) => {
  return (
    <li className="list-item" data-id={list.id}>
      {list.title}
      <button className="delete list"></button>
    </li>
  )
}

export default ListItem;