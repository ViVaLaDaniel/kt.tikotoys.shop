
// Это скрипт для одноразовой загрузки данных в Firestore.
// Запускать его нужно будет вручную из терминала.
import { db } from '../src/firebaseConfig.ts'; // Наша конфигурация Firebase
import { collection, doc, setDoc } from 'firebase/firestore';
import { products } from '../src/data/products.ts'; // Наши локальные данные

const uploadProducts = async () => {
  // Получаем ссылку на коллекцию 'products' в Firestore
  const productsCollection = collection(db, 'products');

  console.log('Начинаю загрузку товаров в Firestore...');

  // Используем Promise.all для параллельной загрузки
  const uploadPromises = products.map(async (product) => {
    // Создаем ссылку на документ, используя ID товара как его уникальный ключ
    const productRef = doc(productsCollection, String(product.id));

    try {
      // Используем setDoc, чтобы принудительно записать данные с нашим ID
      await setDoc(productRef, product);
      console.log(`✅ Товар "${product.name}" (ID: ${product.id}) успешно загружен.`);
    } catch (error) {
      console.error(`❌ Ошибка при загрузке товара ID ${product.id}:`, error);
    }
  });

  // Ждем завершения всех загрузок
  await Promise.all(uploadPromises);

  console.log('\n🎉 Все товары были обработаны!');
};

// Запускаем функцию
uploadProducts();
