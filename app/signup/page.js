
const page = () => {
  const submit = () => {
    const user = {
      username: e.get("username"),
      password: e.get("password")
    }
    console.log(user)
  }
  return (
    <form action={submit}>
      <input type="text" name="username" id="" />
      <input type="password" name="password" id="" />
    </form>
  )
}