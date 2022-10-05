import { Migration } from '@mikro-orm/migrations';

export class Migration20221005141005 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `pony` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `race` enum(\'earth_pony\', \'unicorn\', \'pegasus\', \'alicorn\') not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
  }

}
