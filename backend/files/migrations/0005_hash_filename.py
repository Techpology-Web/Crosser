# Generated by Django 4.2.2 on 2023-09-11 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0004_hash_size_after_hash_size_before'),
    ]

    operations = [
        migrations.AddField(
            model_name='hash',
            name='filename',
            field=models.TextField(default=''),
        ),
    ]