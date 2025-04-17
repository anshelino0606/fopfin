import {CSSProperties, FC} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";


const StyledButton = styled.button`
	border: 3px solid var(--primary-color);
	font-size: 16px;
	border-radius: 8px;
	padding: 8px 12px;
	font-weight: 600;
	font-style: italic;
	transition: all 300ms ease-in-out;
	cursor: pointer;

	&:hover {
		background: var(--primary-color);
	}
`;

interface NavButtonProps {
		label: string;
		link: string;
		replace?: boolean;
		style?: CSSProperties;
}

const NavButton: FC<NavButtonProps> = ({label, link, replace = false, style = {}}) => {
		const navigate = useNavigate();

		return (
				<StyledButton style={style} onClick={() => navigate(link, {replace})}>{label}</StyledButton>
		);
};

export default NavButton;