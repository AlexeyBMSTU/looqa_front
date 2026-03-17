import styles from './DocsPage.module.css';
import { PageComponent } from '@/shared/components/PageComponent/PageComponent';

export const DocsPage = () => {
  return (
    <PageComponent>
      <div className={styles.component}>
        <div id="help1">фывфывфыв</div>
        <div id="help2">фывфывфыв</div>
        <div id="help3">фывфывфыв</div>
        <div id="help4">фывфывфыв</div>
        <div id="help5">фывфывфыв</div>
      </div>
    </PageComponent>
  );
};
