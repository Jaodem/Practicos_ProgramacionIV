from posix import stat
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_session
from app.models.user import User, UserCreate, UserLogin
from app.core.security import hash_password, verify_password

router = APIRouter(prefix='/auth', tags=['Authentication'])

@router.post('/register', response_model=User)
def register_user(user_data: UserCreate, session: Session = Depends(get_session)):
    # Se verifica si el mail ya esta registrado
    statement = select(User).where(User.email == user_data.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail='El correo ya esta registrado'
        )

    # Se crea el nuevo usuario
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hash_password(user_data.password)
    )

    # Se guarda en la base de datos
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user

@router.post('/login')
def login(user_data: UserLogin, session: Session = Depends(get_session)):
    # Se busca el usuario por email
    statement = select(User).where(User.email == user_data.email)
    user = session.exec(statement).first()
    
    # Se verifica la existencia del usuario y la contraseña
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Correo o contraseña incorrectos'
        )
        
    return {
        'message': 'Inicio de sesión exitoso',
        'user': user.name
    }