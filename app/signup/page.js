
const page = () => {
  const user = {
    username: e.get("username"),
    password: e.get("password")
  }
  return (
    <form action={submit}>
      <input type="text" name="username" id="" />
      <input type="password" name="password" id="" />
    </form>
  )
}