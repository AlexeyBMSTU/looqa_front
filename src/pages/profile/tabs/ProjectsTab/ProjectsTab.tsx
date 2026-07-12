import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';
import { profileModel } from '@/features/profile/models';
import { ProjectCard } from '@/pages/feed/components/ProjectCard/ProjectCard';
import styles from './ProjectsTab.module.css';

export const ProjectsTab = observer(() => {
  const { projects } = profileModel;

  if (projects.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📁</span>
        <p className={styles.emptyText}>У вас пока нет проектов</p>
        <Link to="/projects/create" className={styles.emptyLink}>
          Разместить первый проект
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {projects.map(project => (
        <ProjectCard
          hideAuthor
          key={project.id}
          project={project}
          onLike={id => profileModel.toggleLike(id)}
          onLoadComments={id => profileModel.loadComments(id)}
          onAddComment={(id, text) => profileModel.addComment(id, text)}
          loadingCommentsFor={profileModel.loadingCommentsFor}
        />
      ))}
    </div>
  );
});
