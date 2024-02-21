import React from 'react';
import map from 'lodash/map';

import type {
  HomePageData,
  HomeMainSection,
  HomeMediaSection,
  HomeArticleSection,
  HomeFooterSection
} from '@freya/types/home';

import HomeMain from '@components/home/HomeMain';
import HomeMedia from '@components/home/HomeMedia';
import HomeFooter from '@components/home/HomeFooter';
import HomeArticles from '@freya/components/home/HomeArticles';

import InformationImageSrc from './temp/information.svg';
import PatientSupportImageSrc from './temp/patient_support.svg';
import VectorFrame from './temp/vector.svg';
import VideoFrame from './temp/frame.svg';
import LoginImage from './temp/illustration.svg';

const HomePage = () => {
  return (
    <div>
      {map(
        data.sections,
        (
          section: HomeMediaSection | HomeMainSection | HomeArticleSection | HomeFooterSection,
          index: number
        ) =>
          section.type === 'main' ? (
            <HomeMain data={section} key={`main-${index}`} />
          ) : section.type === 'media' ? (
            <HomeMedia data={section} key={`media-${index}`} />
          ) : section.type === 'article' ? (
            <HomeArticles data={section} key={`article-${index}`} />
          ) : section.type === 'footer' ? (
            <HomeFooter data={section} key={`footer-${index}`} />
          ) : (
            <></>
          )
      )}
    </div>
  );
};

export default HomePage;

const data: HomePageData = {
  sections: [
    {
      id: 1,
      type: 'main',
      form: 'register',
      title: {
        bg: 'Пациентска платформа - онкологичен център',
        en: 'Patient hub for quick and convenient access to medical specialists.'
      },
      description: {
        bg: 'Осигурява бърз и удобен достъп до Вашия медицински екип. Структурирана информация за заболяванията на достъпен език. Абонамент за важни за Вас теми. Възможност за записване на час за онлайн консултации.',
        en: 'Access to structured information about medical conditions written in easy-to-understand language. Subscribe for the newest information on topics you care about. Book online or offline appointments. Information about your therapy and consultations.'
      },
      alignment: 'left',
      image: LoginImage,
      colors: {
        title: 'primary-600',
        description: 'black',
        background: 'primary-200'
      }
    },
    {
      id: 2,
      type: 'media',
      title: {
        bg: 'Новата платформа за подкрепа на пациента',
        en: 'Information about medical conditions and therapies without complex terminology.'
      },
      media: {
        source:
          'https://www.youtube.com/watch?v=c3h-8LglXV8&feature=youtu.be&ab_channel=UniHospital',
        type: 'video',
        alignment: 'left',
        backgroundImage: VectorFrame
      },
      colors: {
        title: 'primary-700',
        background: 'white'
      }
    },
    {
      id: 3,
      type: 'media',
      title: {
        bg: 'Информационен център',
        en: 'Information'
      },
      description: {
        bg: 'Достъп до структурирана информация по заболявания и терапии на разбираем език. Най-важното за отделенията в онкологичния център. Възможност за абонамент по теми, които Ви интересуват.',
        en: 'Access to structured information about medical conditions written in easy-to-understand language. Subscribe for the newest information on topics you care about. Book online or offline appointments. Information about your therapy and consultations.'
      },
      media: {
        source: InformationImageSrc,
        type: 'image',
        alignment: 'right'
      },
      colors: {
        title: 'primary',
        description: 'black',
        background: 'primary-200'
      }
    },
    {
      id: 4,
      type: 'media',
      title: {
        bg: 'Групи за пациентска подкрепа',
        en: 'Patient Support'
      },
      description: {
        bg: 'Възможност за задаване на медицински и административни въпроси към лекуващия екип в хода на Вашата терапия.',
        en: 'Your physician will answer all questions you have during the course of your therapy.'
      },
      media: {
        source: PatientSupportImageSrc,
        type: 'image',
        alignment: 'left'
      },
      colors: {
        title: 'secondary',
        description: 'black',
        background: 'secondary-200'
      }
    },
    {
      id: 5,
      type: 'media',
      title: {
        bg: 'Онлайн консултации',
        en: 'Video consultations'
      },
      description: {
        bg: 'Видео консултация с Вашия лекуващ лекар или психолог. Възможност за дистанционен контролен преглед, който ще Ви спести време за пътуване и чакане пред кабинета.',
        en: 'Video call check-up that saves time queuing in clinic halls.'
      },
      media: {
        source:
          'https://www.youtube.com/watch?v=39DuMysWD6k&feature=youtu.be&ab_channel=UniHospital',
        type: 'video',
        alignment: 'right',
        backgroundImage: VideoFrame
      },
      colors: {
        title: 'quarterly',
        description: 'black',
        background: 'quarterly-200'
      }
    },
    // {
    //   id: 6,
    //   type: 'media',
    //   title: {
    //     bg: 'Личен пациентски архив',
    //     en: 'Personal medical record'
    //   },
    //   description: {
    //     bg: 'Възможност за задаване на медицински и административни въпроси към лекуващия екип в хода на Вашата терапия.',
    //     en: 'Your physician will answer all questions you have during the course of your therapy. '
    //   },
    //   media: {
    //     source: ArchiveImageSrc,
    //     type: 'image',
    //     alignment: 'left'
    //   },
    //   colors: {
    //     title: 'tertiary-600',
    //     description: 'black',
    //     background: 'secondary-100'
    //   }
    // },
    // {
    //   id: 7,
    //   type: 'article',
    //   title: {
    //     bg: 'Вижте повече информация за:',
    //     en: 'Find more information about:'
    //   },
    //   articles: [
    //     {
    //       id: 1,
    //       title: { bg: 'Immunotherapy', en: 'Имунотерапия' },
    //       icon: 'fa-light fa-pills',
    //       slug: 'target-therapy'
    //     },
    //     {
    //       id: 2,
    //       title: {
    //         bg: 'Таргетна Терапия',
    //         en: 'Target therapy'
    //       },
    //       icon: 'fa-light fa-pills',
    //       slug: 'target-therapy'
    //     },
    //     {
    //       id: 3,
    //       title: {
    //         bg: 'Специфична терапия',
    //         en: 'Specific therapy'
    //       },
    //       icon: 'fa-light fa-viruses',
    //       slug: 'target-therapy'
    //     },
    //     {
    //       id: 4,
    //       title: {
    //         bg: 'Рак на дебелото черво',
    //         en: 'Colon cancer'
    //       },
    //       icon: 'fa-light fa-stomach',
    //       slug: 'target-therapy'
    //     },
    //     {
    //       id: 5,
    //       title: {
    //         bg: 'Рак на белия дроб',
    //         en: 'Lung cancer'
    //       },
    //       icon: 'fa-light fa-lungs-virus',
    //       slug: 'target-therapy'
    //     }
    //   ],
    //   colors: {
    //     title: 'black',
    //     icon: 'quarterly',
    //     iconBackground: 'quarterly-200',
    //     background: 'quarterly-100'
    //   }
    // },
    {
      id: 8,
      type: 'footer',
      links: [
        {
          title: { en: 'Terms and conditions', bg: 'Правила и условия' },
          slug: 'terms#section-1'
        },
        {
          title: { en: 'Privacy Policy', bg: 'Политика за поверителност' },
          slug: 'terms#section-2'
        },
        {
          title: { en: 'Cookie Policy', bg: 'Политика за бисквитки' },
          slug: 'terms#section-3'
        },
        {
          title: { en: 'Contacts', bg: 'Контакти' },
          slug: 'contacts'
        }
      ],
      socialMedia: [
        {
          icon: 'fa-square-facebook',
          link: 'https://www.facebook.com/unihospital'
        },
        {
          icon: 'fa-linkedin',
          link: 'https://www.linkedin.com/company/uni-hospital'
        }
      ],
      colors: {
        title: 'black',
        background: 'info-200',
        icon: 'white',
        socialMediaBackground: 'primary'
      }
    }
  ]
};
