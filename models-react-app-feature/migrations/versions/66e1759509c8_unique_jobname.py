"""unique jobname

Revision ID: 66e1759509c8
Revises: 91c5d66a4835
Create Date: 2023-12-26 14:34:10.932665

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '66e1759509c8'
down_revision = '91c5d66a4835'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('job', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['jobName'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('job', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###
