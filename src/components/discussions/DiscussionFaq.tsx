import map from 'lodash/map';
import React, { memo } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import { useTranslation } from '@hooks/useTranslation';

import CardFrame from '@components/ui/frames/CardFrame';
import SearchBar from '@components/ui/form-utils/SearchBar';

interface DiscussionFaqProps {}

const DiscussionFaq = (props: DiscussionFaqProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-20">
      <CardFrame className="p-28">
        <div className="d-flex align-items-center justify-content-between mb-20">
          <div className="fs-24 fw-semibold">{t('discussion.faq', 'FAQ')}</div>
          <SearchBar className="d-none d-md-block" />
        </div>
        <Accordion defaultActiveKey="0">
          {map(dummy_faqs, ({ id, question, answer }) => (
            <div key={id} className={id === dummy_faqs.length ? '' : 'mb-20'}>
              <Accordion.Item eventKey={String(id)}>
                <Accordion.Header>
                  <i className="fa-light fa-square-question text-primary fs-24 me-8" />
                  <div className="fw-semibold fs-18">{question}</div>
                </Accordion.Header>
                <Accordion.Body className="bg-primary-100 fs-16 ps-48">{answer}</Accordion.Body>
              </Accordion.Item>
            </div>
          ))}
        </Accordion>
      </CardFrame>
    </div>
  );
};

export default memo(DiscussionFaq);

const dummy_faqs = [
  {
    id: 1,
    question: 'Клинични проучвания',
    answer:
      'Можете да очаквате отговор на поставените въпроси в рамките на 24 ч. Може да участвате с името си или анонимно. Анонимността е само спрямо другите участници в групата. Вашият лекуващ лекар ще може да Ви идентифицира, за да реагира адекватно във Ваш интерес. Можете да задавате въпроси на лекуващия екип във връзка с терапията. Можете да споделяте за възникнали неразположения, странични ефекти и да се консултирате как да ги овладеете най-бързо.'
  },
  {
    id: 2,
    question: 'Клинични проучвания',
    answer:
      'Можете да очаквате отговор на поставените въпроси в рамките на 24 ч. Може да участвате с името си или анонимно. Анонимността е само спрямо другите участници в групата. Вашият лекуващ лекар ще може да Ви идентифицира, за да реагира адекватно във Ваш интерес. Можете да задавате въпроси на лекуващия екип във връзка с терапията. Можете да споделяте за възникнали неразположения, странични ефекти и да се консултирате как да ги овладеете най-бързо.'
  },
  {
    id: 3,
    question: 'Клинични проучвания',
    answer:
      'Можете да очаквате отговор на поставените въпроси в рамките на 24 ч. Може да участвате с името си или анонимно. Анонимността е само спрямо другите участници в групата. Вашият лекуващ лекар ще може да Ви идентифицира, за да реагира адекватно във Ваш интерес. Можете да задавате въпроси на лекуващия екип във връзка с терапията. Можете да споделяте за възникнали неразположения, странични ефекти и да се консултирате как да ги овладеете най-бързо.'
  },
  {
    id: 4,
    question: 'Клинични проучвания',
    answer:
      'Можете да очаквате отговор на поставените въпроси в рамките на 24 ч. Може да участвате с името си или анонимно. Анонимността е само спрямо другите участници в групата. Вашият лекуващ лекар ще може да Ви идентифицира, за да реагира адекватно във Ваш интерес. Можете да задавате въпроси на лекуващия екип във връзка с терапията. Можете да споделяте за възникнали неразположения, странични ефекти и да се консултирате как да ги овладеете най-бързо.'
  },
  {
    id: 5,
    question: 'Клинични проучвания',
    answer:
      'Можете да очаквате отговор на поставените въпроси в рамките на 24 ч. Може да участвате с името си или анонимно. Анонимността е само спрямо другите участници в групата. Вашият лекуващ лекар ще може да Ви идентифицира, за да реагира адекватно във Ваш интерес. Можете да задавате въпроси на лекуващия екип във връзка с терапията. Можете да споделяте за възникнали неразположения, странични ефекти и да се консултирате как да ги овладеете най-бързо.'
  },
  {
    id: 6,
    question: 'Клинични проучвания',
    answer:
      'Можете да очаквате отговор на поставените въпроси в рамките на 24 ч. Може да участвате с името си или анонимно. Анонимността е само спрямо другите участници в групата. Вашият лекуващ лекар ще може да Ви идентифицира, за да реагира адекватно във Ваш интерес. Можете да задавате въпроси на лекуващия екип във връзка с терапията. Можете да споделяте за възникнали неразположения, странични ефекти и да се консултирате как да ги овладеете най-бързо.'
  },
  {
    id: 7,
    question: 'Клинични проучвания',
    answer:
      'Можете да очаквате отговор на поставените въпроси в рамките на 24 ч. Може да участвате с името си или анонимно. Анонимността е само спрямо другите участници в групата. Вашият лекуващ лекар ще може да Ви идентифицира, за да реагира адекватно във Ваш интерес. Можете да задавате въпроси на лекуващия екип във връзка с терапията. Можете да споделяте за възникнали неразположения, странични ефекти и да се консултирате как да ги овладеете най-бързо.'
  },
  {
    id: 8,
    question: 'Клинични проучвания',
    answer:
      'Можете да очаквате отговор на поставените въпроси в рамките на 24 ч. Може да участвате с името си или анонимно. Анонимността е само спрямо другите участници в групата. Вашият лекуващ лекар ще може да Ви идентифицира, за да реагира адекватно във Ваш интерес. Можете да задавате въпроси на лекуващия екип във връзка с терапията. Можете да споделяте за възникнали неразположения, странични ефекти и да се консултирате как да ги овладеете най-бързо.'
  },
  {
    id: 9,
    question: 'Клинични проучвания',
    answer:
      'Можете да очаквате отговор на поставените въпроси в рамките на 24 ч. Може да участвате с името си или анонимно. Анонимността е само спрямо другите участници в групата. Вашият лекуващ лекар ще може да Ви идентифицира, за да реагира адекватно във Ваш интерес. Можете да задавате въпроси на лекуващия екип във връзка с терапията. Можете да споделяте за възникнали неразположения, странични ефекти и да се консултирате как да ги овладеете най-бързо.'
  }
];