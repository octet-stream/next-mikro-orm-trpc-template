import { Migration } from '@mikro-orm/migrations';

export class Migration20230130005748 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `note` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null, `details` text null, `status` enum(\'incompleted\', \'completed\', \'in_progress\', \'paused\', \'rejected\') not null default \'incompleted\', primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `completion` (`id` varchar(255) not null, `created_at` datetime not null, `updated_at` datetime not null, `details` text not null, `completed` tinyint(1) not null default false, `note_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `completion` add index `completion_note_id_index`(`note_id`);');

    this.addSql('alter table `completion` add constraint `completion_note_id_foreign` foreign key (`note_id`) references `note` (`id`) on update cascade on delete cascade;');
  }

}
