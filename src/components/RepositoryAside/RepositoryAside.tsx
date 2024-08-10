import { FC } from 'react'
import { IRepository } from './../../shared/types/index'
import StarIcon from '@mui/icons-material/Star'
import styles from './RepositoryAside.module.scss'

interface IRepositoryAside {
	repo: IRepository | null
}

const RepositoryAside: FC<IRepositoryAside> = props => {
	const { repo } = props

	if (!repo) {
		return (
			<div className={styles.aside}>
				<div className={styles.aside__container}>
					<div className={styles.aside__text}>Выберите репозиторий</div>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.aside}>
			<div className={styles.aside__form}>
				<h2 className={styles.aside__form__title}>{repo.name}</h2>
				<div className={styles.aside__form__block}>
					{repo.primaryLanguage?.name && (
						<div className={styles.aside__form__language}>
							{repo.primaryLanguage?.name}
						</div>
					)}
					<div className={styles.aside__form__star}>
						<StarIcon className={styles.star} />
						<div>{repo.stargazers.totalCount || ''}</div>
					</div>
				</div>
				<div className={styles.aside__form__topic}>
					{repo.repositoryTopics.nodes.map(item => (
						<div
							className={styles.aside__form__topic__item}
							key={item.topic.name}
						>
							{item.topic.name}
						</div>
					))}
				</div>
				<div>{repo.description}</div>
			</div>
		</div>
	)
}

export { RepositoryAside }
