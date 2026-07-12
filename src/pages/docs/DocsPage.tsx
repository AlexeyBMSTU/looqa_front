import styles from './DocsPage.module.css';
import { PageComponent } from '@/shared/components/PageComponent/PageComponent';
import { Aside } from './Aside/Aside';
import { AboutSection } from './AboutSection/AboutSection';
import { ContactsSection } from './ContactsSection/ContactsSection';
import { FAQSection } from './FAQSection/FAQSection';

export const DocsPage = () => {
  return (
    <PageComponent>
      <div className={styles.component}>
        <Aside />
        <div className={styles.content}>
          <AboutSection />
          <ContactsSection />
          <FAQSection />
        </div>
      </div>
    </PageComponent>
  );
};
