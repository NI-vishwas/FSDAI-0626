"""add user role field

Revision ID: 9a1f9b6d4c2e
Revises: 602e50e373ab
Create Date: 2026-10-20 21:10:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "9a1f9b6d4c2e"
down_revision = "602e50e373ab"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "users",
        sa.Column("role", sa.String(length=20), nullable=False, server_default="customer"),
    )


def downgrade():
    op.drop_column("users", "role")
