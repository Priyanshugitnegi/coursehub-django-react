from django.db import migrations


def create_categories(apps, schema_editor):
    Category = apps.get_model("home", "Category")

    categories = [
        "Programming",
        "Web Development",
        "Database",
        "Data Science",
    ]

    for name in categories:
        Category.objects.get_or_create(name=name)


def remove_categories(apps, schema_editor):
    Category = apps.get_model("home", "Category")

    Category.objects.filter(
        name__in=[
            "Programming",
            "Web Development",
            "Database",
            "Data Science",
        ]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0005_enrollment_unique_user_course"),
    ]

    operations = [
        migrations.RunPython(
            create_categories,
            remove_categories,
        ),
    ]