import React from 'react';
import PropTypes from 'prop-types'
import Button from '../component/Button'


const Header = ({ title, onAdd, showAdd }) => {

    return (
      
        <header className='header'><h1  >{title }</h1>
            <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd }></Button>
       </header>
      
    )
};
Header.defaultProps = {
    title:"Tasker"
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
    
}


export default Header;
