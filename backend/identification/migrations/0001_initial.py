# Generated by Django 4.2.5 on 2023-09-05 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('files', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.TextField()),
                ('password', models.TextField()),
                ('decompressed_size', models.IntegerField()),
                ('compressed_size', models.IntegerField()),
                ('hashes', models.ManyToManyField(to='files.hash')),
            ],
        ),
    ]
