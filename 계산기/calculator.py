def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    return x/ y

def get_user_input():
    num1 = float(input("첫 번째 숫자를 입력하세요: "))
    operator = input("연산자를 입력하세요 (+, -, *, /): ")
    num2 = float(input("두 번째 숫자를 입력하세요: "))
    return num1, operator, num2

def calculate(num1, operator, num2):
    if operator == "+":
        return add(num1, num2)
    elif operator == "-":
        return subtract(num1, num2)
    elif operator == "*":
        return multiply(num1, num2)
    elif operator == "/":
        return divide(num1, num2)
    else:
        return "잘못된 연산자입니다."
    
def main():
    num1, operator, num2 = get_user_input()
    result = calculate(num1, operator, num2)
    print(f"결과: {result}")

if __name__ == "__main__":
    main()
