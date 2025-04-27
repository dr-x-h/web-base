import bcrypt


def to_hash(password: str) -> str:
    salt = bcrypt.gensalt(rounds=12)
    hashed_bytes = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_bytes.decode('utf-8')


def verify_hash(password: str, hash_code: str) -> bool:
    hashed_bytes = hash_code.encode('utf-8')
    return bcrypt.checkpw(password.encode('utf-8'), hashed_bytes)
