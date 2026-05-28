from sqlmodel import create_engine


db_name = "db.sqlite3"
db_url = f"sqlite///:{dbname}"

engine = create_engine(db_url)