import { ReactNode } from "react";
import { Link } from "react-router-dom";

type StyledLinkProps = {
    children: ReactNode,
    to: string,
}
function StyledLink({to, children}:StyledLinkProps){
    return <Link to={to} className="hover:text-gray-100 hover:underline">{children}</Link>
}
export default StyledLink