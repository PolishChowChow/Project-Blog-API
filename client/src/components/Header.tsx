import StyledLink from "./StyledLink";
import LogoutLink from "./LogoutLink";
import Cookies from "js-cookie"
function Header() {
  const isToken = Cookies.get("token") === undefined;
  return (
    <header className="bg-neutral-950 flex flex-row py-7 px-10">
        <div className="grow">
            <h2 className="text-xl">
              <StyledLink to="/">BlogManiac</StyledLink>
            </h2>
        </div>
        <div>
            <nav className="flex gap-2">
                {isToken ? <>
                  <StyledLink to="/login">Login</StyledLink>
                <StyledLink to="/register">Register</StyledLink>
                </>
                :
                <>
                  <StyledLink to="/create">Create a post</StyledLink>
                  <LogoutLink />
                </>}
            </nav>
        </div>
    </header>
  )
}
export default Header;
