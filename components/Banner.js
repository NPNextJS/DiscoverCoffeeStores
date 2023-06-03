import styles from "./Banner.module.css";

const Banner = ({ buttonText, handleOnBannerClick }) => {
  return (
    <div className={styles.container}>
      <h1>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Stores</span>
      </h1>
      <p className={styles.subTitle}>Discover your local Coffee shops!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnBannerClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
