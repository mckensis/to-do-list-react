const ListItem = ({ list }) => {
  return (
    <li className="list-item" data-id={list.id}>{list.title}</li>
  )
}

export default ListItem;