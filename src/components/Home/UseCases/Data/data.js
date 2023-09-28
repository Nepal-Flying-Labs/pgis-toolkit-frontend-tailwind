/* eslint-disable import/prefer-default-export */
import usecase1 from '@Assets/images/home/usecase/UseCase.png';
import usecase2 from '@Assets/images/home/usecase/usecase2.jpg';

export const useCases = [
  {
    id: '1',
    heading: 'Transport Assessment',
    content: [
      {
        id: '1',
        heading: 'Transport Need Assessment',
        title: 'Mapping Kakamega, Kenya for Transportation Needs Assessment',
        description:
          'The first pilot of the uSAFIRI tool was conducted here. The learnings from this assessment drove the technical feature development of the tool.',
        date: 'Aug 2020 - Jan 2022',
        img: usecase1,
      },
      {
        id: '2',
        heading: 'Transport Need Assessment',
        title:
          'Mapping Birendranagar , Surkhet  for Transportation Needs Assessment',
        description:
          'Local youths from birendranagar surkhet carried out a data collection exercise in rural and urban wards of BIRENDRANAGAR, SURKHET. This data was then uploaded to uSAFIRI to conduct different basic transport need assessment and spatial analysis.',
        date: 'Feb 2023 - Mar 2023',
        img: usecase2,
      },
    ],
  },
  {
    id: '2',
    heading: 'Participatory Risk Mapping',
  },

  {
    id: '3',
    heading: 'Other Thematic Areas',
  },
];
