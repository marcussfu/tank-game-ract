import './button.styles.scss';

const Button = ({children, butonType, ...otherProps}) => {
    return <div className='button-container' {...otherProps}>{children}</div>
};

export default Button;