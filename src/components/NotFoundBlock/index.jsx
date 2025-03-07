import styles from './NotFound.module.scss'

const NotFoundBlock = () => {
  return (
	  <div className={styles.NotFound}>
		  <span>😟</span>
		  <br />
		  <h1>Нечего не найдено</h1>
		  <p>К сожалению данная страница отсутствует в нашем интернет-магазина</p>
	</div>
  )
}

export default NotFoundBlock
