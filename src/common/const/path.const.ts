import * as process from "process";
import {join} from 'path'

//서버 프로젝트의 루트 폴더
export const PROJECT_ROOT_PATH = process.cwd();

// 외부에서 접근 가능한 파일들을 모아둔 폴더 이름
export const PUBLIC_FOLDER_NAME = 'public';

// 포스트 이미지들을 저장할 폴더이름
export const POSTS_FOLDER_NAME = 'posts'

export const PUBLIC_FOLDER_PATH = join(

)