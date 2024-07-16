import unittest
from main_package.module1 import hello

class TestModule1(unittest.TestCase):
    def test_hello(self):
        self.assertEqual(hello("World"), "Hello, World!")

if __name__ == '__main__':
    unittest.main()