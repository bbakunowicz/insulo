import React, { Fragment } from 'react'
import Link from '@material-ui/core/Link';

const handleClick = (event, history, link) => {
  event.preventDefault();
  history.push(link);
}

const Page = ({history, text, linkText, link}) => {
  return (
    <Fragment>
      <h1>{text}</h1>
      <Link href="#" onClick={(e) => handleClick(e, history, link)}>{linkText}</Link>
    </Fragment>
  );
}

export default Page
