import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow p-4 md:p-6  bottom-0 left-0 w-full">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left mb-4 md:mb-0">
          © 2030 <Link to="/" className="hover:underline">Epic Movies</Link>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap justify-center md:justify-end items-center text-sm text-gray-500 dark:text-gray-400">
          <li>
            <a href="https://www.instagram.com/shubham.ul/" target="_blank" rel="noreferrer" className="hover:underline mr-4 md:mr-6">Instagram</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/shubhamsarda/" target="_blank" rel="noreferrer" className="hover:underline mr-4 md:mr-6">LinkedIn</a>
          </li>
          <li>
            <a href="https://twitter.com/shubham_ul" target="_blank" rel="noreferrer" className="hover:underline mr-4 md:mr-6">Twitter</a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCuH_UB-L_PaVQSBoOqp0cqw" target="_blank" rel="noreferrer" className="hover:underline mr-4 md:mr-6">Youtube</a>
          </li>
          <li>
            <a href="https://github.com/ShubhamSarda" target="_blank" rel="noreferrer" className="hover:underline">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};