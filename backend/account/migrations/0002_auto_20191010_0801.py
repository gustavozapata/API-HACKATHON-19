# Generated by Django 2.2.5 on 2019-10-10 08:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='plaid_access_token',
            field=models.TextField(null=True),
        ),
        migrations.CreateModel(
            name='PlaidItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_id', models.TextField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plaid_items', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
