import React from 'react'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const handleClick = (event, history) => {
  event.preventDefault();
  history.push('/item2');
}

const Page = ({history}) => {
  return (
    <section>
      <h1>Home</h1>
      <Typography paragraph>"Hello! How are you?"</Typography>
      <Link href="#" onClick={(e) => handleClick(e, history)}>{'Go to "Item 2"'}</Link>
    </section>
  )
}

export default Page
