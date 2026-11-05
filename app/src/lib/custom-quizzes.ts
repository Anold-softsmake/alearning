import type {Question} from './data';
export type CustomQuiz={id:string;title:string;unit:string;topic:string;attemptLimit:number;status:'draft'|'published';questions:Question[]};
export const CUSTOM_QUIZZES_KEY='masomo-custom-quizzes';
