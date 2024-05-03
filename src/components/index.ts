import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
export * from './LoginButton';


interface ModalPortalProps {
	children: ReactNode;
}

export const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
	return ReactDOM.createPortal(children, document.body);
};