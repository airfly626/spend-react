<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260822111044 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE daily_spend (id INT AUTO_INCREMENT NOT NULL, spend_date DATE NOT NULL, category_id INT NOT NULL, amount NUMERIC(10, 2) NOT NULL, description NVARCHAR(255), mood NVARCHAR(10), mood_score INT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME, deleted_at DATETIME, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE daily_spend ALTER mood_score SET DEFAULT 0');
        $this->addSql('CREATE TABLE spend_category (id INT AUTO_INCREMENT NOT NULL, category_code NVARCHAR(2) NOT NULL, category_name NVARCHAR(10) NOT NULL, delete_flag TINYINT NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE spend_category ALTER delete_flag SET DEFAULT 0');

        $this->addSql("
            insert into spend_category 
                (category_code, category_name)
            values 
                (1,N'食'),
                (2,N'衣'),
                (3,N'住'),
                (4,N'行'),
                (5,N'育'),
                (6,N'樂'),
                (99,N'雜項')
        ");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs      
        $this->addSql('DROP TABLE daily_spend');
        $this->addSql('DROP TABLE spend_category');
    }
}
