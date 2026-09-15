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
        $this->addSql('CREATE TABLE daily_spend (id INT IDENTITY NOT NULL, spend_date DATE NOT NULL, category_id INT NOT NULL, amount NUMERIC(10, 2) NOT NULL, description NVARCHAR(255), mood NVARCHAR(10), mood_score INT NOT NULL, created_at DATETIME2(6) NOT NULL, updated_at DATETIME2(6), deleted_at DATETIME2(6), PRIMARY KEY (id))');
        $this->addSql('ALTER TABLE daily_spend ADD DEFAULT 0 FOR mood_score');
        $this->addSql('CREATE TABLE spend_category (id INT IDENTITY NOT NULL, category_code NVARCHAR(2) NOT NULL, category_name NVARCHAR(10) NOT NULL, delete_flag BIT NOT NULL, PRIMARY KEY (id))');
        $this->addSql('ALTER TABLE spend_category ADD DEFAULT 0 FOR delete_flag');

        $this->addSql('EXEC sp_addextendedproperty N\'MS_Description\', N\'心情\', N\'SCHEMA\', \'dbo\', N\'TABLE\', \'daily_spend\', N\'COLUMN\', mood');
        $this->addSql('EXEC sp_addextendedproperty N\'MS_Description\', N\'代碼\', N\'SCHEMA\', \'dbo\', N\'TABLE\', \'spend_category\', N\'COLUMN\', category_code');

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
                (99,N'雜項'),
                (21,N'收入')
        ");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA db_accessadmin');
        $this->addSql('CREATE SCHEMA db_backupoperator');
        $this->addSql('CREATE SCHEMA db_datareader');
        $this->addSql('CREATE SCHEMA db_datawriter');
        $this->addSql('CREATE SCHEMA db_ddladmin');
        $this->addSql('CREATE SCHEMA db_denydatareader');
        $this->addSql('CREATE SCHEMA db_denydatawriter');
        $this->addSql('CREATE SCHEMA db_owner');
        $this->addSql('CREATE SCHEMA db_securityadmin');
        $this->addSql('DROP TABLE daily_spend');
        $this->addSql('DROP TABLE spend_category');
    }
}
