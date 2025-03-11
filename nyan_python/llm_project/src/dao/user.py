from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from fastapi import FastAPI


class User(BaseModel):
    id: int = Field(..., description="用户ID")
    name: str = Field(..., min_length=1, max_length=50, description="用户名") # 必填字段，长度限制
    age: int = Field(gt=0, le=120)  # 年龄必须大于0且小于等于120
    email: str = Field(..., description="用户邮箱")
    created_at: str = Field(..., description="创建时间")

    @field_validator("email")
    def validate_email(cls, v) -> str:
        if "@" not in v:
            raise ValueError("Invalid email format")
        return v.lower()  # 自动转为小写
    
    
app = FastAPI()
@app.post("/users")
def create_user(user: User):
    return user.model_dump()

if __name__ == "__main__":
    user = User(id=1, name="Alice", age=25, email="alice@example.com", created_at="2022-01-01")
    print("json:",user.model_dump_json())
    print("dict:", user.model_dump())
    print("schmema:", user.model_json_schema())