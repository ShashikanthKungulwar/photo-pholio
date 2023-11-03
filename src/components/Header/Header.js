import styles from "./Header.module.css"
import headerLogo from '../../images/header-logo.png';
export default function Header()
{
    return (
        <>
            <header className={styles.header}>
                <img src={headerLogo} onClick={()=>{window.location.reload()}} alt="logo" height={50} width={50}/>
                <h2 onClick={()=>{window.location.reload()}} >Photo Pholio</h2>
            </header>
        </>
    )
} 