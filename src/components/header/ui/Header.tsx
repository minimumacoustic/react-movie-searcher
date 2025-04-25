import styles from './Header.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>MovieSearch</h1>
        </header> 
    );
}