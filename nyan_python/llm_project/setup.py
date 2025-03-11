from setuptools import setup, find_packages

setup(
    name='reglow_project',
    version='1.0.0',
    author='Nyan',
    author_email='test@example.com',
    description='regflow project learning',
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=["requests>=2.25"],
    entry_points={
        'console_scripts': [
            'my_script = src.main:main'
        ]
    }
)