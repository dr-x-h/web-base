"""empty message

Revision ID: 419d9b10a362
Revises: b7cfc79c8bb8
Create Date: 2025-04-25 16:47:17.917849

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '419d9b10a362'
down_revision = 'b7cfc79c8bb8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=mysql.VARCHAR(length=255),
               nullable=False)
        batch_op.alter_column('password',
               existing_type=mysql.VARCHAR(length=255),
               nullable=False)
        batch_op.alter_column('last_login',
               existing_type=mysql.DATETIME(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('last_login',
               existing_type=mysql.DATETIME(),
               nullable=False)
        batch_op.alter_column('password',
               existing_type=mysql.VARCHAR(length=255),
               nullable=True)
        batch_op.alter_column('username',
               existing_type=mysql.VARCHAR(length=255),
               nullable=True)

    # ### end Alembic commands ###
