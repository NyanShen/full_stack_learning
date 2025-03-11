from setuptools import setup, find_packages

setup(
    name='fine_tuning_project',
    version='1.0.0',
    author='Nyan',
    author_email='test@example.com',
    description='fine tuning project learning',
    packages=find_packages(),
    install_requires=["requests>=2.25"],
    entry_points={
        'console_scripts': [
            'my_script = src.main:main'
        ]
    }
)