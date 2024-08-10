from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles 
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from .models import Base
from .routers import users

# 데이터베이스 테이블 생성
Base.metadata.create_all(bind=engine)

# FastAPI 애플리케이션 초기화
app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 정적 파일을 /frontend 경로에서 서빙하도록 설정
app.mount("/backend/app/static", StaticFiles(directory="app/static"), name="static")

# 사용자 관련 라우터 추가
app.include_router(users.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}
