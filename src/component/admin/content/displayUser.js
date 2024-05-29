const DisplayUser = (props) => {
  const { data } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Email</th>
          <th scope="col">UserName</th>
          <th scope="col">process</th>
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{user.id}</th>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td className="d-flex gap-2">
                    <button
                      type="button"
                      class="btn btn-dark"
                      onClick={() => props.handleOnclickView(user)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => props.handleOnclickUpDate(user)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => props.handleOnclickDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          : "dont care"}
      </tbody>
    </table>
  );
};
export default DisplayUser;
