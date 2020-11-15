DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS product;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS product (
  id UUID DEFAULT uuid_generate_v4(),
  description varchar(1000) NOT NULL,
  title varchar(100) NOT NULL,
  price NUMERIC(5,2) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS stock (
  id UUID DEFAULT uuid_generate_v4(),
  product_id UUID,
  count integer NOT NULL,
  CONSTRAINT product_id FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

INSERT INTO product (description, title, price) VALUES
    ('Consequuntur eligendi sit quod dicta illo ad.\nUnde quia nihil ut quo similique.', 'Tasty Metal Bacon', 150),
    ('Repudiandae inventore aliquid aliquam laboriosam quaerat sint omnis quia vitae.\nIste quia qui et vitae temporibus facere sunt est.\nQuis ut eius perspiciatis explicabo.\nAliquam officiis voluptatem est esse molestiae veniam.', 'Handmade Fresh Towels', 140),
    ('Tenetur ea in.', 'Handmade Granite Pants', 130),
    ('Quae quia voluptates perferendis adipisci quam aut ut. Ea molestias aspernatur perferendis quasi et quo in. Esse odio dolores. Culpa sunt quidem.\n \rQuos et assumenda voluptatibus culpa provident maiores reprehenderit nemo. Molestias qui velit dolorem tempore. Ut illum accusantium mollitia tenetur inventore officia. Sit beatae et iure repellat a dolorum fugit eius.\n \rMagnam nihil accusamus officiis tenetur eligendi. Officiis excepturi nihil sint ea dicta quis et. Dolorem repudiandae voluptas. Nulla repellat voluptas quo necessitatibus voluptatem eum provident.', 'Sleek Granite Soap', 120),
    ('Amet laborum provident molestias provident sint rerum et beatae atque.', 'Ergonomic Fresh Fish', 110),
    ('dolore quaerat ea', 'Fantastic Frozen Mouse', 100),
    ('Est aut fugit sequi reiciendis a culpa eius vero rerum. Et in et quisquam eaque qui dignissimos enim. Quod sapiente inventore quasi qui et vel. Velit est in fugit vel. Facilis eos accusantium dolor quo molestias labore pariatur voluptas sint.', 'Gorgeous Steel Car', 90),
    ('Non adipisci delectus non vero omnis nihil explicabo facilis. Odit et nostrum. Dolorem iure nobis illum dolores omnis tempore hic sunt ipsam.', 'Intelligent Granite Cheese', 80),
    ('Repudiandae eveniet et. Et unde eos et. Aspernatur officiis adipisci autem porro. Animi et iusto consequatur consequuntur quia earum aut. Saepe distinctio est eligendi rerum quas rerum magnam.\n \rFacere deserunt voluptate a non non sed enim ut aut. Beatae qui necessitatibus accusamus provident ratione asperiores saepe dolore praesentium. Recusandae expedita nam est ab. Sed dolorum ab. Repellendus omnis tempora rerum et fugiat alias totam.\n \rEt rerum provident id ut nihil. Dignissimos rem nesciunt vitae beatae sunt earum voluptatum praesentium. Impedit nemo consequuntur modi quisquam explicabo sunt.', 'Sleek Fresh Shirt', 70),
    ('Omnis quibusdam occaecati deserunt. Rerum libero autem dolores molestiae delectus nostrum dolores. Temporibus nobis vitae explicabo vel incidunt enim qui optio. Iusto sint eaque nisi. Adipisci ipsum totam excepturi cum culpa omnis quia laboriosam. Ea rerum labore tempora quas corrupti.\n \rNulla perspiciatis voluptatibus quia quia nesciunt quod molestiae qui ab. Facilis voluptates omnis ad quasi debitis blanditiis. Commodi est facere molestiae. Ut nobis quia et tenetur.\n \rSoluta eum non nisi. Pariatur est id iusto soluta accusamus. Libero numquam autem nam voluptatibus aspernatur.', 'Handcrafted Metal Mouse', 60),
    ('Tempore asperiores ut aliquid ex qui optio. Autem voluptatibus nihil numquam expedita eos id.', 'Intelligent Steel Chicken', 50),
    ('Doloremque doloribus optio.', 'Sleek Plastic Bike', 40),
    ('Veniam sit autem maxime.', 'Licensed Fresh Chicken', 30),
    ('Praesentium et ipsa non sed debitis voluptate. Consequatur incidunt soluta quia molestias non non aut. Delectus ipsa error eius autem saepe nesciunt.', 'Handmade Granite Table', 20),
    ('Exercitationem aut aut quisquam neque. Ducimus inventore sed reiciendis ut nisi incidunt qui quia. Rem sed maiores exercitationem aut eveniet quae. Iusto qui nostrum. Voluptatem hic est quod labore. Dignissimos aspernatur et quis quasi id.', 'Handmade Wooden Mouse', 10),
    ('Repudiandae quam sed porro corporis aperiam dolorum maiores quo recusandae. Neque aut ea vitae sequi assumenda aut. Cumque deleniti sit ea. Est perspiciatis molestiae in rem debitis nulla aut quod ducimus.', 'Rustic Metal Mouse', 5);

INSERT INTO stock (count, product_id) VALUES
  (10, (select id from product where price = 150)),
  (20, (select id from product where price = 140)),
  (30, (select id from product where price = 130)),
  (40, (select id from product where price = 120)),
  (50, (select id from product where price = 110)),
  (60, (select id from product where price = 100)),
  (70, (select id from product where price = 90)),
  (80, (select id from product where price = 80)),
  (90, (select id from product where price = 70)),
  (20, (select id from product where price = 60)),
  (30, (select id from product where price = 50)),
  (40, (select id from product where price = 40)),
  (50, (select id from product where price = 30)),
  (60, (select id from product where price = 20)),
  (70, (select id from product where price = 10)),
  (80, (select id from product where price = 5));

